import React from 'react';
import { AiFillFire as icon } from 'react-icons/ai';
import S from '@sanity/desk-tool/structure-builder';

// custom sidebar
const Sidebar = () =>
  S.list()
    .id('sidebar')
    .title(`Slick's Slices`)
    .items([
      S.listItem()
        .id('homepage')
        .title('Home Page')
        .icon(icon)
        .child(S.editor().schemaType('storeSettings').documentId('ville')),
      // add rest of items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);

export default Sidebar;
