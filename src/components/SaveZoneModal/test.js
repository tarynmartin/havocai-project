import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SaveZoneModal from './SaveZoneModal';
import { RootStoreProvider } from '../../Providers/RootStoreProvider';

describe('SaveZoneModal', () => {
  it('renders correctly', () => {
    render(
      <RootStoreProvider>
        <SaveZoneModal open={true} handleClose={() => {}} />
      </RootStoreProvider>
    )

    expect(screen.getByText('Save Zone')).toBeInTheDocument()
    expect(screen.getByText('Zone Type')).toBeInTheDocument()
    expect(screen.getByText('Zone Coordinates')).toBeInTheDocument()
    expect(screen.getByText('Please enter a name for the zone')).toBeInTheDocument()
    expect(screen.getByText('Zone Name')).toBeInTheDocument()
    expect(screen.getByText('Notes on the Zone')).toBeInTheDocument()
    expect(screen.getByLabelText('Zone Notes')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })
  it('calls handleClose when Cancel is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn()
    render(
      <RootStoreProvider>
        <SaveZoneModal open={true} handleClose={handleClose} />
      </RootStoreProvider>
    )

    const modal = within(await screen.findByRole('dialog'));
    await user.click(modal.getByText('Cancel'))

    expect(handleClose).toHaveBeenCalled()
  })
  it('allows user to add a zone name and notes', async () => {
    const user = userEvent.setup();
    
    render(
      <RootStoreProvider>
        <SaveZoneModal open={true} handleClose={() => {}} />
      </RootStoreProvider>
    )

    const modal = within(await screen.findByRole('dialog'));
    const zoneName = await modal.findByTestId('name-input')
    const zoneNotes = modal.getByLabelText('Zone Notes')
    await user.type(zoneName, 'Test Zone')
    await user.type(zoneNotes, 'This is a test zone')

    expect(zoneName).toHaveValue('Test Zone')
    expect(zoneNotes).toHaveValue('This is a test zone')
  });
})