package util.statemachine;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class Action {
    private Integer id;
    private String name;

    public Action() {
        super();
    }

    public Action(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        Action action = (Action) o;

        return id != null ? id.equals(action.id) : action.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
