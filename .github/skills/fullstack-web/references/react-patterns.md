# React Patterns

## Component Structure
```tsx
// Separate container (data) from presentation (UI)
export function TransactionList() {
  const { data, isLoading, error } = useTransactions();
  
  if (isLoading) return <TransactionListSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!data?.length) return <EmptyState message="No transactions" />;
  
  return <TransactionListContent transactions={data} />;
}

// Pure presentational component — easy to test and preview
function TransactionListContent({ transactions }: { transactions: Transaction[] }) {
  return (
    <ul role="list">
      {transactions.map((txn) => (
        <TransactionRow key={txn.id} transaction={txn} />
      ))}
    </ul>
  );
}
```

## Custom Hooks
```tsx
function useTransactions(filters?: TransactionFilters) {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => api.getTransactions(filters),
    staleTime: 30_000, // 30 seconds
  });
}
```

## Form Handling
```tsx
const schema = z.object({
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().length(3, "Currency must be 3-letter code"),
  merchantId: z.string().min(1, "Merchant ID required"),
});

type PaymentFormData = z.infer<typeof schema>;

function PaymentForm({ onSubmit }: { onSubmit: (data: PaymentFormData) => void }) {
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(schema),
    defaultValues: { amount: 0, currency: 'USD', merchantId: '' },
  });
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields with validation errors */}
    </form>
  );
}
```

## Testing
```tsx
import { render, screen, userEvent } from '@testing-library/react';

test('displays transaction amount', () => {
  render(<TransactionRow transaction={testTransaction({ amount: 25.00 })} />);
  expect(screen.getByText('$25.00')).toBeInTheDocument();
});

test('submits payment form', async () => {
  const onSubmit = vi.fn();
  render(<PaymentForm onSubmit={onSubmit} />);
  
  await userEvent.type(screen.getByLabelText('Amount'), '25.00');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ amount: 25 }));
});
```
