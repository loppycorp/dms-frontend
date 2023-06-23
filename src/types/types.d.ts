import React from "react";
import { FormValues } from "@/context/FormContext";

export {};

declare global {
  interface TabsType {
    name: string;
    form: React.ComponentType;
  }

  type DataFromAPI = { data: { [key: string]: any }[] } | null;

  type PageItem = {
    id: number;
    title: string;
    slug: string;
    buttons: InputItem[];
    item_buttons: InputItem[];
    fields: InputItem[];
    windows: WindowItem[];
    json_data: any;
    generated_data: FormValues;
    api_url: string;
    display_fields: string;
    display_columns: string;
    additional_sections: any[];
    access: string[];
  };

  type PaginationItem = {
    page_num: number;
    page_limit: number;
    page_count: number;
    sort_order: string;
    sort_by: string;
    total_result: number;
  };

  type WindowItem = {
    id: number;
    title: string;
    form: SectionItem;
    api_url: string;
  };

  type MenuLinkItem = {
    title: string;
    url: string;
    icon?: any;
    icon_active?: any;
    bullet_color?: string;
    children?: MenuLinkItem[];
    access?: string[];
  };

  type MenuItem = {
    id: number;
    title: string;
    slug: string;
    items: MenuLinkItem[];
  };

  type FormItem = {
    id: number;
    title: string;
    forms: InputItem[];
  };

  type SectionItem = {
    id: number;
    title: string;
    forms: FormSectionItem[];
  };

  type InputProp = {
    name: string;
    value: any;
    onChange: (name: string, value: any, parent?: string) => void;
  };

  type InputItem = {
    id: number;
    __component: string;
    classes: string | null;
    width: string;
    label: string;
    value: string | boolean;
    type: string;
    disabled: boolean;
  };

  interface InputTextItem extends InputItem {
    placeholder: string;
    type: string;
  }

  interface FormSectionItem extends InputItem {
    forms: FormItem[];
  }

  interface InputTextbox extends InputItem {}

  interface InputSelect extends InputItem {
    items: string;
  }

  interface InputAutocomplete extends InputItem {
    api_url: string;
    fields_to_display: string;
  }

  interface InputDateRange extends InputItem {
    from: string;
    to: string;
  }

  interface SectionTitle extends InputItem {}

  interface TableElement extends InputItem {
    fields: object;
  }

  interface ButtonElement extends InputItem {
    icon: string;
    url: string;
    method_name: string;
    params: string;
    fields: any;
  }

  interface ButtonModalElement extends InputItem {
    button: ButtonElement;
    form: SectionItem;
  }

  interface RadioGroup extends InputItem {
    items: string;
  }
}
