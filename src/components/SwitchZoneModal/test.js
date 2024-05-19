import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SwitchZoneModal from './SwitchZoneModal'
import { RootStoreProvider } from '../../Providers/RootStoreProvider';

describe('SwitchZoneModal', () => {
  it('renders correctly', async () => {
    render(
      <RootStoreProvider>
        <SwitchZoneModal open={true} handleClose={() => {}} />
      </RootStoreProvider>
    )

    expect(screen.getByText('Switch Zone')).toBeInTheDocument()
    expect(screen.getByText('You haven\'t saved your current zone. Are you sure you want to switch zones?')).toBeInTheDocument()
    expect(screen.getByText('Don\'t Save')).toBeInTheDocument()
    expect(screen.getByText('Save Zone')).toBeInTheDocument()
  })
  it('calls handleClose with true when Save Zone is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn()
    render(
      <RootStoreProvider>
        <SwitchZoneModal open={true} handleClose={handleClose} />
      </RootStoreProvider>
    )

    const modal = within(await screen.findByRole('dialog'));
    await user.click(modal.getByText('Save Zone'))

    expect(handleClose).toHaveBeenCalledWith(true)
  })
  it('calls handleClose with false  when Don\'t Save is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn()
    render(
      <RootStoreProvider>
        <SwitchZoneModal open={true} handleClose={handleClose} />
      </RootStoreProvider>
    )

    const modal = within(await screen.findByRole('dialog'));
    await user.click(modal.getByText('Don\'t Save'))

    expect(handleClose).toHaveBeenCalledWith(false)
  })
})