import { HeaderComponent } from '../../components/globals/header/header.component';

export const ContentOnly = (content: any) => {
  return { content };
}

export const HeaderContent = (content: any) => {
  return {
    'header': HeaderComponent,
    content
  }
}