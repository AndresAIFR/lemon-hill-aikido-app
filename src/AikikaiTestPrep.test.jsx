import { describe, it, vi, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import html2pdf from 'html2pdf.js';
import AikikaiTestPrep from './AikikaiTestPrep';

// Mock html2pdf so the test doesn’t try to create a real PDF
vi.mock('html2pdf.js', () => ({ default: vi.fn() }));

describe('AikikaiTestPrep component', () => {
  it('mounts without crashing', () => {
    render(<AikikaiTestPrep />);
  });

  it('downloads PDF when button clicked', () => {
    const { getByText } = render(<AikikaiTestPrep />);
    fireEvent.click(getByText('View Training Report'));
    fireEvent.click(getByText('Download PDF'));
    expect(html2pdf).toHaveBeenCalled();
  });
});
