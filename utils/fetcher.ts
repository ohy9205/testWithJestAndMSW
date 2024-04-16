type Response = {
  code: string;
  value: any;
};

type ContentType = "json" | "form";

export interface Fetcher {
  setMethod(method: string): void;
  setBody(body: Record<string, any>): void;
  setContentType(type: ContentType): void;
  fetching<T>(url: string): Promise<Response>;
}
