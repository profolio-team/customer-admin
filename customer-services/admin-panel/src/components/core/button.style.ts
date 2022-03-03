import { Components, ComponentsOverrides, ComponentsVariants} from '@mui/material';
import { GetTypeOfProperty } from './utils/type.utils';

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    iconSquareSmall: true;
    iconSquareLarge: true;
  }
}

const variants: ComponentsVariants['MuiButton'] = [
  {
    props: { size: 'iconSquareSmall' },
    style: {
      paddingInlineEnd: 14,
      paddingInlineStart: 14,
    },
  },
  {
    props: { size: 'iconSquareLarge' },
    style: {
      height: '56px',
      paddingInlineEnd: 18,
      paddingInlineStart: 18,
    },
  },
  {
    props: { variant: 'outlined' },
    style: {
      '&:focus': {
        border: '1px solid #1068EB',
        boxShadow: '0px 0px 0px 1px #FFFFFF, 0px 0px 0px 2px #1068EB',
        borderRadius: '4px',
      },
    },
  },
  {
    props: { size: 'large' },
    style: {
      height: '56px',
      paddingInlineEnd: 24,
      paddingInlineStart: 24,
    },
  },
  {
    props: { variant: 'text' },
    style: {
      '&:focus': {
        background: '#CED4DA',
        border: 'none',
        boxShadow: 'none',
        borderRadius: '4px',
      },
    },
  },
];

const style: ComponentsOverrides['MuiButton'] = {

  root: {
    height: '48px',
    paddingInlineEnd: 16,
    paddingInlineStart: 16,
    minWidth: 0,
    fontSize: '16px',
    fontFamily: 'var(--font-family)',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textTransform: 'none',
    '& .MuiSvgIcon-root': {
      height: '20px',
      width: '20px',
      margin: 0,
      paddingInlineStart: 0,
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': {
      border: '2px solid #FFFFFF',
      boxShadow: '0px 0px 0px 2px #1055BB',
      borderRadius: '4px',
    },
  },
};

export const customButton: GetTypeOfProperty<Components, 'MuiButton'> = {
  variants: variants,
  styleOverrides: style,
};