import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tables } from '../../tables/schemas/table.schema';
import { Restaurant } from '../../restaurant/schemas/restaurant.schema';
import { Category } from '../../category/schemas/category.schema';
import { Language } from '../../language/schemas/language.schema';

export type MenuDocument = HydratedDocument<Menu>;

@Schema({ versionKey: false })
export class Menu {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category_id: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  })
  restaurant_id: Restaurant;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: string;

  @Prop()
  image_url: string;

  @Prop()
  status: string;

}

export const MenuSchema = SchemaFactory.createForClass(Menu);
