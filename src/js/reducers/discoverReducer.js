const initialState = {
  institution: "",
  dueDate: "",
  dueDateUnformatted: "",
  userInputErrorMessage: undefined
};

export default function discoverReducer(state=initialState, actions) {
  switch (actions.type)
  {
    case "INSTITUTION_DUEDATE_CHANGING": {
      return {...state,
        dueDateUnformatted: actions.payload,
        userInputErrorMessage: undefined
      };
    }
    case "INSTITUTION_UPDATE": {
      return {...state,
        institution: actions.payload.institution,
        dueDate: actions.payload.dueDate,
        dueDateUnformatted: actions.payload.dueDate,
        userInputErrorMessage: undefined
      };
    }
    case "INSTITUTION_UPDATE_ERROR": {
      return {...state,
        institution: actions.payload.institution,
        dueDate: undefined,
        userInputErrorMessage: actions.payload.userInputErrorMessage
      }
    }
  }
  return state;
}
