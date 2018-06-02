const initialState = {
  institution: "",
  dueDate: "",
  dueDateUnformatted: "",
  userInputErrorMessage: undefined,
  error: undefined
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
    case "INSTITUTION_SAVE_PENDING": {
      return {...state,
        saving: true,
        saved: false,
        error: undefined
      };
    }
    case "INSTITUTION_SAVE_REJECTED": {
      return {...state,
        saving: false,
        saved: false,
        error: actions.payload
      };
    }
    case "INSTITUTION_SAVE_FULFILLED": {
      return {...state,
        institution: actions.payload.institution,
        dueDate: actions.payload.dueDate,
        userInputErrorMessage: undefined,
        saving: false,
        saved: true,
        error: undefined
      }
    }
    case "INSTITUTION_UPDATE_ERROR": {
      return {...state,
        institution: actions.payload.institution,
        dueDate: undefined,
        userInputErrorMessage: actions.payload.userInputErrorMessage
      };
    }
  }
  return state;
}
