import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RootStoreProvider } from '../../Providers/RootStoreProvider';
import DownloadCSV from './DownloadCSV';

describe('DownloadCSV', () => {
  it('renders correctly', () => {
    render(
      <RootStoreProvider>
        <DownloadCSV buttonText='test' />
      </RootStoreProvider>
    )

    expect(screen.getByText('test')).toBeInTheDocument()
  });
})