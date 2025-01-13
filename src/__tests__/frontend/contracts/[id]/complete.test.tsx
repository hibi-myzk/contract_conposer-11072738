{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import Complete from '@/pages/contracts/[id]/complete';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('PDF出力完了画面', () => {
  it('完了メッセージが表示されること', () => {
    render(
      <>
        <Header />
        <Complete />
        <Footer />
      </>
    );
    expect(screen.getByText('PDFの出力が完了しました。')).toBeInTheDocument();
  });

  it('契約書一覧へボタンの遷移が正しく行われること', () => {
    const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({ push }));

    render(
      <>
        <Header />
        <Complete />
        <Footer />
      </>
    );

    fireEvent.click(screen.getByText('契約書一覧へ'));
    expect(push).toHaveBeenCalledWith('/contracts');
  });

  it('契約書詳細へボタンの遷移が正しく行われること', () => {
    const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');
    const push = jest.fn();

    useRouter.mockImplementation(() => ({ push }));

    render(
      <>
      <Header />
        <Complete id={1} />
        <Footer />
      </>
    );

    fireEvent.click(screen.getByText('契約書詳細へ'));
    expect(push).toHaveBeenCalledWith('/contracts/1');
  });
});"}