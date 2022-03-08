const axios = require('axios');
const { Buffer } = require('buffer');
const { API, ACCOUNT_ID } = require ('../config');

export class Near {
  constructor(timeout = 30000) {
      this.api = API;
      this.account_id = ACCOUNT_ID;
      this.timeout = timeout;
  }

  parseResponse(response) {
    if (!response) {
      return undefined;
    }

    return JSON.parse(Buffer.from(response).toString());
  }
  base64EncodeArgs(args) {
    return Buffer.from(args).toString('base64');
  }

  async callFunction(method_name, args = "") {
    let request = {
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "call_function",
        finality: "final",
        account_id: this.account_id,
        method_name: method_name,
        args_base64: this.base64EncodeArgs(args)
      }
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    const response = await axios.post(this.api, JSON.stringify(request), { headers }, this.timeout);

    return this.parseResponse(response?.data?.result?.result);
  }
}


