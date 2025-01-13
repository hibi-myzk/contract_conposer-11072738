{"code": "import { NextApiRequest, NextApiResponse } from 'next/server';
import { createContractTemplates } from '@/services/contractTemplates';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
});

export async function POST(
  req: Request,
  res: NextApiResponse
) {
  try {
    const json = await req.json();
    // Validate request body
    const validatedData = schema.parse(json);

    await createContractTemplates(validatedData.name, validatedData.content);

    return new Response('Contract Template created successfully', { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('Failed to create contract template.', { status: 500 });
  }
}

import { jest } from '@jest/globals';
import { NextRequest } from 'next/server';
describe('POST /api/contract-templates/create', () => {
  it('should create a contract template successfully', async () => {
    const req = new NextRequest('http://localhost/api/contract-templates/create', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Template',
        content: 'Test Content',
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
    expect(await res.text()).toBe('Contract Template created successfully');
  });

  it('should return 400 error for invalid request body', async () => {
    const req = new NextRequest('http://localhost/api/contract-templates/create', {
      method: 'POST',
      body: JSON.stringify({
        name: '',
        content: '',
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('should handle server errors gracefully', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(global, 'createContractTemplates').mockRejectedValue(new Error('DB Error'));
    const req = new NextRequest('http://localhost/api/contract-templates/create', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Template',
        content: 'Test Content',
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(await res.text()).toBe('Failed to create contract template.');
    jest.restoreAllMocks();
  });
});"}