package util.statemachine;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class Operation {
    private Integer idAction;
    private Integer idState;

    public Operation() {
    }

    public Operation(Integer idAction, Integer idState) {
        this.idAction = idAction;
        this.idState = idState;
    }

    public Integer getIdAction() {
        return idAction;
    }

    public void setIdAction(Integer idAction) {
        this.idAction = idAction;
    }

    public Integer getIdState() {
        return idState;
    }

    public void setIdState(Integer idState) {
        this.idState = idState;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        Operation operation = (Operation) o;

        if (idAction != null ? !idAction.equals(operation.idAction) : operation.idAction != null)
            return false;
        return idState != null ? idState.equals(operation.idState) : operation.idState == null;
    }

    @Override
    public int hashCode() {
        int result = idAction != null ? idAction.hashCode() : 0;
        result = 31 * result + (idState != null ? idState.hashCode() : 0);
        return result;
    }
}
