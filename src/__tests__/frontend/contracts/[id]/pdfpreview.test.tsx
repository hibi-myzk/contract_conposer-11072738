{"code": "import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PdfPreview from '@/pages/contracts/[id]/pdfpreview';

// モックコンポーネント
jest.mock('@/components/Header', () => () => <div>Header</div>);
jest.mock('@/components/Footer', () => () => <div>Footer</div>);

describe('PDFプレビュー画面', () => {
  it('ヘッダーとフッターが表示されること', () => {
    render(<PdfPreview params={{ id: '1' }} />); // params を渡す
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('PDFが表示されること', async () => {
    render(<PdfPreview params={{ id: '1' }} />); // params を渡す
    // PDFの表示領域が存在することを確認
    const pdfViewer = screen.getByRole('document'); // role=\"document\" を使用
    expect(pdfViewer).toBeInTheDocument();
  });
});"}