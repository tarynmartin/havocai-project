import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RootStoreProvider } from '../../Providers/RootStoreProvider';
import MenuDrawer from './MenuDrawer';

describe('MenuDrawer', () => {
  it('renders correctly', () => {
    render(
      <RootStoreProvider>
        <MenuDrawer open={true} handleClose={() => {}} />
      </RootStoreProvider>
    )

    expect(screen.getByText('Save Zone')).toBeInTheDocument()
    expect(screen.getByText('Saved Zones')).toBeInTheDocument()
    expect(screen.getByText('Zones')).toBeInTheDocument()
    expect(screen.getByText('Avoid Zone')).toBeInTheDocument()
    expect(screen.getByText('Geo Fence')).toBeInTheDocument()
    expect(screen.getByText('Terminal Area')).toBeInTheDocument()
  })
})