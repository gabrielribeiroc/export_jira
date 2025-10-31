from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from jira import JIRA
import pandas as pd
from datetime import datetime
import os
from io import BytesIO
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import mm

app = Flask(__name__)
CORS(app)

# Configura??o do Jira
jira_client = None

@app.route('/api/health', methods=['GET'])
def health():
    """Endpoint para verificar se o servi?o est? funcionando"""
    return jsonify({"status": "ok", "message": "Jira Export API est? funcionando"})

@app.route('/api/connect', methods=['POST'])
def connect_jira():
    """Conecta ao Jira usando as credenciais fornecidas"""
    global jira_client
    
    try:
        data = request.json
        jira_url = data.get('jira_url')
        email = data.get('email')
        api_token = data.get('api_token')
        
        if not all([jira_url, email, api_token]):
            return jsonify({"error": "Todos os campos s?o obrigat?rios"}), 400
        
        # Conectar ao Jira
        jira_client = JIRA(
            server=jira_url,
            basic_auth=(email, api_token)
        )
        
        # Testar conex?o
        jira_client.myself()
        
        return jsonify({
            "success": True,
            "message": "Conectado ao Jira com sucesso"
        })
    
    except Exception as e:
        return jsonify({"error": f"Erro ao conectar: {str(e)}"}), 400

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Retorna lista de projetos dispon?veis no Jira"""
    if not jira_client:
        return jsonify({"error": "N?o conectado ao Jira"}), 401
    
    try:
        projects = jira_client.projects()
        projects_list = [{"key": p.key, "name": p.name} for p in projects]
        return jsonify({"projects": projects_list})
    
    except Exception as e:
        return jsonify({"error": f"Erro ao buscar projetos: {str(e)}"}), 400

@app.route('/api/tickets', methods=['POST'])
def get_tickets():
    """Extrai tickets do Jira baseado nos filtros fornecidos"""
    if not jira_client:
        return jsonify({"error": "N?o conectado ao Jira"}), 401
    
    try:
        data = request.json
        project_key = data.get('project_key', '')
        jql = data.get('jql', '')
        
        # Construir JQL
        if not jql:
            if project_key:
                jql = f'project = {project_key} ORDER BY created DESC'
            else:
                jql = 'ORDER BY created DESC'
        
        # Buscar tickets
        issues = jira_client.search_issues(jql, maxResults=1000)
        
        tickets = []
        for issue in issues:
            ticket = {
                "key": issue.key,
                "summary": issue.fields.summary,
                "status": issue.fields.status.name,
                "priority": issue.fields.priority.name if issue.fields.priority else "N/A",
                "assignee": issue.fields.assignee.displayName if issue.fields.assignee else "N?o atribu?do",
                "reporter": issue.fields.reporter.displayName if issue.fields.reporter else "N/A",
                "created": issue.fields.created,
                "updated": issue.fields.updated,
                "issue_type": issue.fields.issuetype.name,
                "project": issue.fields.project.key,
                "description": issue.fields.description[:200] + "..." if issue.fields.description and len(issue.fields.description) > 200 else (issue.fields.description or ""),
            }
            
            # Adicionar campos customizados se existirem
            if hasattr(issue.fields, 'labels'):
                ticket['labels'] = ', '.join(issue.fields.labels) if issue.fields.labels else ""
            
            if hasattr(issue.fields, 'components'):
                ticket['components'] = ', '.join([c.name for c in issue.fields.components]) if issue.fields.components else ""
            
            tickets.append(ticket)
        
        return jsonify({
            "success": True,
            "total": len(tickets),
            "tickets": tickets
        })
    
    except Exception as e:
        return jsonify({"error": f"Erro ao buscar tickets: {str(e)}"}), 400

@app.route('/api/export/excel', methods=['POST'])
def export_excel():
    """Exporta os tickets para Excel"""
    try:
        data = request.json
        tickets = data.get('tickets', [])
        
        if not tickets:
            return jsonify({"error": "Nenhum ticket para exportar"}), 400
        
        # Criar DataFrame
        df = pd.DataFrame(tickets)
        
        # Criar arquivo Excel em mem?ria
        output = BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Tickets Jira')
            
            # Ajustar largura das colunas
            worksheet = writer.sheets['Tickets Jira']
            for idx, col in enumerate(df.columns):
                max_length = max(
                    df[col].astype(str).apply(len).max(),
                    len(col)
                )
                worksheet.column_dimensions[chr(65 + idx)].width = min(max_length + 2, 50)
        
        output.seek(0)
        
        # Nome do arquivo com timestamp
        filename = f"jira_tickets_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
        
        return send_file(
            output,
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            as_attachment=True,
            download_name=filename
        )
    
    except Exception as e:
        return jsonify({"error": f"Erro ao exportar Excel: {str(e)}"}), 400

@app.route('/api/export/pdf', methods=['POST'])
def export_pdf():
    """Exporta os tickets para PDF"""
    try:
        data = request.json
        tickets = data.get('tickets', [])
        
        if not tickets:
            return jsonify({"error": "Nenhum ticket para exportar"}), 400
        
        # Criar PDF em mem?ria
        output = BytesIO()
        doc = SimpleDocTemplate(output, pagesize=landscape(A4))
        elements = []
        
        # Estilo
        styles = getSampleStyleSheet()
        
        # T?tulo
        title = Paragraph(f"<b>Relat?rio de Tickets Jira - {datetime.now().strftime('%d/%m/%Y %H:%M')}</b>", styles['Heading1'])
        elements.append(title)
        
        # Preparar dados para tabela (campos principais)
        table_data = [['Key', 'Resumo', 'Status', 'Prioridade', 'Respons?vel', 'Tipo']]
        
        for ticket in tickets:
            row = [
                ticket.get('key', ''),
                ticket.get('summary', '')[:50] + '...' if len(ticket.get('summary', '')) > 50 else ticket.get('summary', ''),
                ticket.get('status', ''),
                ticket.get('priority', ''),
                ticket.get('assignee', '')[:20],
                ticket.get('issue_type', '')
            ]
            table_data.append(row)
        
        # Criar tabela
        table = Table(table_data, repeatRows=1)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 9),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('FONTSIZE', (0, 1), (-1, -1), 7),
        ]))
        
        elements.append(table)
        
        # Gerar PDF
        doc.build(elements)
        output.seek(0)
        
        # Nome do arquivo com timestamp
        filename = f"jira_tickets_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        
        return send_file(
            output,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=filename
        )
    
    except Exception as e:
        return jsonify({"error": f"Erro ao exportar PDF: {str(e)}"}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
