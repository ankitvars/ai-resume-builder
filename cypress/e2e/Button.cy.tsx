import { Button } from '@mui/material';

describe('MUI Button', () => {
  it('renders correctly', () => {
    cy.mount(<Button>Click me</Button>);
    cy.contains('Click me');
  });
});
