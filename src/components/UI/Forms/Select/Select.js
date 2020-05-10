import React from 'react';
import {SelectWrapper, StyledSelect, Error} from '../../../../hoc/layout/elements';

const Select = ({name, changeFn, blurFn, errors, touched, firstOption, items, classname}) => {
  return (
    <SelectWrapper>
      <StyledSelect
        name={name}
        onChange={changeFn}
        onBlur={blurFn}
        className={classname}
      >
        <option value="" label={firstOption} />
        {
          items.map((option) => {
            return (
              <option key={option.value} value={option.value} label={option.label} />
            )
          })
        }
      </StyledSelect>
      <Error show={errors[name] && touched[name]}>{errors[name]}</Error>
    </SelectWrapper>
  )
}

export default Select;
