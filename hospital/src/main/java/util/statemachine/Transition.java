package util.statemachine;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class Transition {
    private Integer origin;
    private Integer destination;

    public Transition() {
    }

    public Transition(Integer origin, Integer destination) {
        this.origin = origin;
        this.destination = destination;
    }

    public Integer getOrigin() {
        return origin;
    }

    public void setOrigin(Integer origin) {
        this.origin = origin;
    }

    public Integer getDestination() {
        return destination;
    }

    public void setDestination(Integer destination) {
        this.destination = destination;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        Transition that = (Transition) o;

        if (origin != null ? !origin.equals(that.origin) : that.origin != null)
            return false;
        return destination != null ? destination.equals(that.destination) :
                that.destination == null;
    }

    @Override
    public int hashCode() {
        int result = origin != null ? origin.hashCode() : 0;
        result = 31 * result + (destination != null ? destination.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Transition{");
        sb.append("origin=").append(origin);
        sb.append(", destination=").append(destination);
        sb.append('}');
        return sb.toString();
    }
}
