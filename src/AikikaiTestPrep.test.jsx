import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import AikikaiTestPrep from './AikikaiTestPrep';

describe('AikikaiTestPrep component', () => {
  it('mounts without crashing', () => {
    render(<AikikaiTestPrep />);
  });
});
