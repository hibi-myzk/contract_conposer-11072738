{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import Templates from '@/pages/contracts/templates';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Axios のモック
const mockedAxios = axios as jest.Mocked<typeof axios>;
global.axios = mockedAxios;

describe('Templates Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.get.mockResolvedValue({
      data: [
        { id: '1', name: 'テンプレート1' },
        { id: '2', name: 'テンプレート2' },
      ],
      status: 200,
      statusText: 'OK',
    });
  });

  it('renders Header and Footer components', () => {
    render(<Templates />);
    expect(screen.getByRole('heading', { name: '契約書作成システム' })).toBeInTheDocument(); // Header
    expect(screen.getByText(/© 2024 契約書作成システム/i)).toBeInTheDocument(); // Footer
  });

  it('fetches and displays contract templates', async () => {
    render(<Templates />);
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/contract-templates');
    expect(await screen.findByText('テンプレート1')).toBeInTheDocument();
    expect(await screen.findByText('テンプレート2')).toBeInTheDocument();
  });

  it('handles API errors', async () => {
    const errorMessage = 'テンプレートの取得に失敗しました。';
    mockedAxios.get.mockRejectedValue(new Error('API Error'));
    render(<Templates />);
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('navigates to the contract input screen when a template is selected', async () => {
    const mockRouter = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouter,
    });

    render(<Templates />);
    await screen.findByText('テンプレート1');
    fireEvent.click(screen.getByText('テンプレート1'));
    expect(mockRouter).toHaveBeenCalledWith('/contracts/new?templateId=1');
  });
});"}