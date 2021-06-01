interface IEduzzItemDTO {
  item_id: number;
  item_name: string;
  item_value: number;
  item_coupon_code: string;
  item_coupon_value: number;
  item_product_id: number;
  item_product_name: string;
  item_product_refund: number;
  item_product_sku_reference: string;
  item_product_partner_cod: number;
  item_product_chargetype: string;
  trans_items_quantity: number;
  trans_job_id: number;
  trans_job_status: number;
  trans_orderid: number;
  utm_campaign: string;
  utm_content: string;
  utm_medium: number;
  utm_source: string;
}

export default IEduzzItemDTO;
