interface ItemOverview {
  icon: string;
  values: number | string;
  name: string;
  properties?: unknown;
}
export interface Overview {
  wind: ItemOverview;
  pressure: ItemOverview;
  uv: ItemOverview;
  visibility: ItemOverview;
  precip: ItemOverview;
  cloud: ItemOverview;
}
