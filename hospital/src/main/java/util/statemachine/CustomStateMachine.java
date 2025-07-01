package util.statemachine;

import java.util.NoSuchElementException;

public class CustomStateMachine {
    protected StateMachine stateMachine;

    public boolean isValidTransition(State origin, State destination) {
        Transition transition = new Transition(origin.getId(), destination.getId());
        return stateMachine.getTransitions().contains(transition);
    }

    public boolean isDoable(Action action, State state) {
        Operation operation = new Operation(action.getId(), state.getId());
        return stateMachine.getOperations().contains(operation);
    }

    public State getStateById(Integer idState) {
        return stateMachine.getStates().stream().filter(state -> state.getId().equals(idState))
                .findFirst().orElseThrow(() -> new NoSuchElementException("Element not found with id: " + idState));
    }
}
