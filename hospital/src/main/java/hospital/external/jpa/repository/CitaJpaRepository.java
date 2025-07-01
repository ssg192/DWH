package hospital.external.jpa.repository;

import hospital.external.jpa.model.CitaJpa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CitaJpaRepository extends JpaRepository<CitaJpa, Integer> {
}
