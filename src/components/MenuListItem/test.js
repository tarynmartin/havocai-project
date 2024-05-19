import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RootStoreProvider } from '../../Providers/RootStoreProvider';
import { MenuListItem }from './MenuListItem';
import { IconMenuListItem } from './MenuListItem';
import AddIcon from '@mui/icons-material/Add';

describe('MenuListItem', () => {
  it('renders correctly', () => {
    render(
      <RootStoreProvider>
        <MenuListItem text="test" />
      </RootStoreProvider>
    )

    expect(screen.getByText('test')).toBeInTheDocument()
  })
  it('calls onClick when clicked', async () => {
    const mockOnClick = jest.fn();
    const user = userEvent.setup();

    render(
      <RootStoreProvider>
        <MenuListItem text="test" selected={true} onClick={mockOnClick} />
      </RootStoreProvider>
    )

    const listItem = screen.getByText('test');
    await user.click(listItem);

    expect(mockOnClick).toHaveBeenCalled();
  })
  it('is unclickable when disabled', async () => {
    render(
      <RootStoreProvider>
        <MenuListItem text="test" disabled={true} />
      </RootStoreProvider>
    )

    const listItem = screen.getByRole('button');

    expect(listItem).toHaveAttribute("aria-disabled");
  })
  it('renders correctly when selected is true', async () => {
    render(
      <RootStoreProvider>
        <MenuListItem text="test" selected={true} />
      </RootStoreProvider>
    )

    const listItem = await screen.findByRole('button');
    const isSelected = listItem.className.includes('Mui-selected');

    expect(isSelected).toBe(true);
  });
});

describe('IconMenuListItem', () => {
  it('renders correctly', () => {
    render(
      <RootStoreProvider>
        <IconMenuListItem text="test" />
      </RootStoreProvider>
    )

    expect(screen.getByText('test')).toBeInTheDocument()
  })
  it('calls onClick when clicked', async () => {
    const mockOnClick = jest.fn();
    const user = userEvent.setup();

    render(
      <RootStoreProvider>
        <IconMenuListItem text="test" selected={true} onClick={mockOnClick} />
      </RootStoreProvider>
    )

    const listItem = screen.getByText('test');
    await user.click(listItem);

    expect(mockOnClick).toHaveBeenCalled();
  })
  it('renders correctly when selected is true', async () => {
    render(
      <RootStoreProvider>
        <IconMenuListItem text="test" selected={true} />
      </RootStoreProvider>
    )

    const listItem = await screen.findByRole('button', { name: 'test' });
    const isSelected = listItem.className.includes('Mui-selected');

    expect(isSelected).toBe(true);
  });
  it('calls onIconClick when icon is clicked', async () => {
    const mockOnIconClick = jest.fn();
    const user = userEvent.setup();

    render(
      <RootStoreProvider>
        <IconMenuListItem text="test" onIconClick={mockOnIconClick} />
      </RootStoreProvider>
    )

    const icon = screen.getByRole('button', { name: 'delete' });
    await user.click(icon);

    expect(mockOnIconClick).toHaveBeenCalled();
  });
  it('renders custom icon when passed', () => {
    render(
      <RootStoreProvider>
        <IconMenuListItem text="test" icon={<AddIcon />} />
      </RootStoreProvider>
    )

    const icon = screen.findByTestId('AddIcon');

    waitFor(() => expect(icon).toBeInTheDocument());
  });
  it('renders custom label when passed', () => {
    render(
      <RootStoreProvider>
        <IconMenuListItem text="test" label="test-label" />
      </RootStoreProvider>
    )

    const icon = screen.getByRole('button', { name: 'test-label' });

    expect(icon).toBeInTheDocument();
  });
});