import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { TestTube } from 'lucide-react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { AppMenuItem } from './app-menu-item'

let user: UserEvent
let handleClickMenuItem: Mock<(arg: string) => void>

describe('Menu Item Component', () => {
  beforeEach(() => {
    user = userEvent.setup()
    handleClickMenuItem = vi.fn()
  })

  it('should be able to click in a menu item', async () => {
    const wrapper = render(
      <MemoryRouter>
        <AppMenuItem
          name={'Test'}
          icon={TestTube}
          route={'/route'}
          handleClickMenuItem={handleClickMenuItem}
        />
      </MemoryRouter>,
    )

    const button = wrapper.getByRole('heading', {
      name: 'Test',
    })

    await user.click(button)

    expect(handleClickMenuItem).toHaveBeenCalledWith('Test')
  })
})
