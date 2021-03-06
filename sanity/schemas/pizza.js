import { MdLocalPizza as icon } from 'react-icons/md';

import PriceInput from '../components/PriceInput';

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the Pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Pizza price in cents',
      validation: (Rule) => Rule.min(1000),
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      name: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
      topping4: 'toppings.4.name',
      isVegetarian0: 'toppings.0.vegetarian',
      isVegetarian1: 'toppings.1.vegetarian',
      isVegetarian2: 'toppings.2.vegetarian',
      isVegetarian3: 'toppings.3.vegetarian',
      isVegetarian4: 'toppings.4.vegetarian',
    },
    prepare: ({ name, media, ...otherProps }) => {
      // 1. filter undefined toppings
      // 2. return the preview object for the pizza
      const filteredProps = Object.values(otherProps).filter(
        (prop) => prop !== undefined
      );
      let isVegetarianPizza = true;

      const topsAreVegetarian = filteredProps.filter(
        (topping) => typeof topping === 'boolean'
      );

      topsAreVegetarian.forEach((flag) => {
        if (!flag) {
          isVegetarianPizza = false;
        }
      });

      const toppings = filteredProps.filter(
        (topping) => typeof topping === 'string'
      );

      return {
        title: `${name} ${isVegetarianPizza ? '🌱' : ''}`,
        media,
        subtitle: toppings.join(', '),
      };
    },
  },
};
