import { Fetcher } from "./fetcher";

export class FetchAdapter implements Fetcher {
  private fetchOptions: RequestInit;

  constructor() {
    this.fetchOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    };
  }

  setMethod(method: string): void {
    this.fetchOptions.method = method;
  }

  setContentType(type: "json" | "form"): void {
    if (type === "form") {
      this.fetchOptions.headers = {
        ...this.fetchOptions.headers,
        "Content-Type": "application/x-www-form-urlencoded",
      };
      ("application/x-www-form-urlencoded");
    } else if (type === "json") {
      this.fetchOptions.headers = {
        ...this.fetchOptions.headers,
        "Content-Type": "application/json",
      };
    }
  }

  setBody(body: Record<string, any>): void {
    const headers = new Headers(this.fetchOptions.headers);
    if (headers.get("Content-Type") === "application/x-www-form-urlencoded") {
      this.fetchOptions.body = new URLSearchParams(body).toString();
    } else if (headers.get("Content-Type") === "application/json") {
      this.fetchOptions.body = JSON.stringify(body);
    }
  }

  async fetching<T>(url: string): Promise<{ code: string; value: any }> {
    try {
      const res = await fetch(url, this.fetchOptions);
      const data = await res.json();

      return data;
    } catch (error) {
      return {
        code: "fail",
        value: {},
      };
    }
  }
}
