"""
Testes b?sicos para a aplica??o Jira Export
"""
import sys
import os

# Adicionar o diret?rio pai ao path
sys.path.insert(0, os.path.dirname(__file__))

def test_imports():
    """Testa se todas as bibliotecas necess?rias podem ser importadas"""
    try:
        from flask import Flask
        from flask_cors import CORS
        from jira import JIRA
        import pandas as pd
        from reportlab.lib import colors
        print("? Todas as bibliotecas foram importadas com sucesso")
        return True
    except ImportError as e:
        print(f"? Erro ao importar biblioteca: {e}")
        return False

def test_app_creation():
    """Testa se a aplica??o Flask pode ser criada"""
    try:
        from flask import Flask
        from flask_cors import CORS
        
        app = Flask(__name__)
        CORS(app)
        
        @app.route('/test')
        def test():
            return {'status': 'ok'}
        
        print("? Aplica??o Flask criada com sucesso")
        return True
    except Exception as e:
        print(f"? Erro ao criar aplica??o: {e}")
        return False

def test_health_endpoint():
    """Testa o endpoint de health"""
    try:
        import app as jira_app
        
        with jira_app.app.test_client() as client:
            response = client.get('/api/health')
            data = response.get_json()
            
            if response.status_code == 200 and data.get('status') == 'ok':
                print("? Endpoint /api/health funcionando")
                return True
            else:
                print("? Endpoint /api/health retornou resposta inesperada")
                return False
    except Exception as e:
        print(f"? Erro ao testar endpoint: {e}")
        return False

def test_pandas_operations():
    """Testa opera??es b?sicas do pandas para exporta??o"""
    try:
        import pandas as pd
        from io import BytesIO
        
        # Criar DataFrame de teste
        data = {
            'key': ['PROJ-1', 'PROJ-2'],
            'summary': ['Teste 1', 'Teste 2'],
            'status': ['Done', 'In Progress']
        }
        df = pd.DataFrame(data)
        
        # Testar exporta??o para Excel
        output = BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Test')
        
        if output.getvalue():
            print("? Opera??es do pandas funcionando")
            return True
        else:
            print("? Erro nas opera??es do pandas")
            return False
    except Exception as e:
        print(f"? Erro ao testar pandas: {e}")
        return False

def run_all_tests():
    """Executa todos os testes"""
    print("=" * 50)
    print("Executando Testes - Jira Export Backend")
    print("=" * 50)
    print()
    
    tests = [
        ("Importa??es", test_imports),
        ("Cria??o da App", test_app_creation),
        ("Endpoint Health", test_health_endpoint),
        ("Opera??es Pandas", test_pandas_operations)
    ]
    
    results = []
    for name, test_func in tests:
        print(f"Testando: {name}")
        result = test_func()
        results.append(result)
        print()
    
    print("=" * 50)
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print(f"? Todos os testes passaram! ({passed}/{total})")
        return 0
    else:
        print(f"? Alguns testes falharam. ({passed}/{total})")
        return 1

if __name__ == '__main__':
    exit_code = run_all_tests()
    sys.exit(exit_code)
