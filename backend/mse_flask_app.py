from flask import Flask, jsonify, request
import search

app = Flask(__name__)

priority = {"root_symbol" : 0,
            "bbg" : 0,
            "symbol" : 0,
            "ric" : 0,
            "cusip" : 0,
            "isin" : 0,
            "bb_yellow" : 0,
            "bloomberg" : 0,
            "spn" : 0,
            "security_id" : 0,
            "sedol" : 0}

@app.route('/search', methods = ['POST'])
def home():
    if(request.method == 'POST'):
        query = request.form['Text']
        return jsonify({'data': search.get_security_ids(query, list(priority.keys()))})
  

@app.route('/click', methods = ['POST'])
def disp():
    if (request.method == 'POST'):
        symbol = request.form['symbol']
        priority[symbol] += 1
        priority = {k: v for k, v in sorted(priority.items(), key=lambda item: item[1])}

    return "Updated Priorities Successfully"
  
  
# driver function
if __name__ == '__main__':
    app.run(port=5001, debug = True)