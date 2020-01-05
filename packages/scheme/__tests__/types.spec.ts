import { assert, IsExact } from 'conditional-type-checks'

import { ValidSchemeKey } from '@themes/scheme'

describe('ValidSchemeKey', () => {
  type NormalButtonType = 'normal' | 'normal2'
  type DangerButtonType = 'danger' | 'danger2'
  type ButtonType = NormalButtonType | DangerButtonType

  type ButtonColorScheme = { textColor: string; backgroundColor: string }

  type ValidButtonType = ValidSchemeKey<ButtonType, ButtonColorScheme>
  type ValidNormalButtonType = ValidSchemeKey<NormalButtonType, ButtonColorScheme>
  type ValidDangerButtonType = ValidSchemeKey<DangerButtonType, ButtonColorScheme>

  it('should able to being excluded properly', () => {
    type ExcludedValidButtonType = Exclude<ValidButtonType, ValidDangerButtonType>
    type ExpectedValidButtonType = Exclude<ValidNormalButtonType, undefined | ButtonColorScheme>

    assert<IsExact<ExcludedValidButtonType, ExpectedValidButtonType>>(true)
  })

  it('should able to used in if statement', () => {
    const buttonType = 'normal' as ValidButtonType

    function isNormalButtonType(type: ValidButtonType): type is ValidNormalButtonType {
      return type === 'normal'
    }

    if (isNormalButtonType(buttonType)) {
      assert<IsExact<typeof buttonType, ValidNormalButtonType>>(true)
    } else {
      assert<IsExact<typeof buttonType, ValidNormalButtonType>>(false)
      assert<
        IsExact<typeof buttonType, Exclude<ValidDangerButtonType, undefined | ButtonColorScheme>>
      >(true)
    }
  })
})
