package util.statemachine;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@Slf4j
public class StateMachineLoader {
    private StateMachineLoader() {
    }

    public static Optional<StateMachine> load(String file) {
        ObjectMapper mapper = new ObjectMapper();
        InputStream input = Thread.currentThread().getContextClassLoader()
                .getResourceAsStream(file);
        try {
            log.info("Loading {}", file);
            StateMachine sm = mapper.readValue(input, StateMachine.class);
            return Optional.of(sm);
        } catch (Exception e) {
            log.error("Cannot read {}", file, e);
        } finally {
            try {
                if (input != null) {
                    input.close();
                }
            } catch (IOException e) {
                log.error("Cannot close {}", file, e);
            }
        }
        return Optional.empty();
    }
}
