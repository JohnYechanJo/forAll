package project.forAll.service;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.BassDomain;

import java.util.List;
import java.util.Optional;

public abstract class Service {
    protected abstract JpaRepository getRepository();

    public void save(final BassDomain obj){ getRepository().saveAndFlush(obj);}

    public List<? extends BassDomain> findAll() {
        return getRepository().findAll();
    }

    public void saveAll(final List<? extends BassDomain> objects) {
        getRepository().saveAll(objects);
        getRepository().flush();
    }

    public void delete(final BassDomain obj) {
        getRepository().delete(obj);
    }

    public void deleteAll() {
        getRepository().deleteAll();
    }

    public long count() {
        return getRepository().count();
    }

    public boolean existsById(final Object id) {
        return getRepository().existsById(id);
    }

    public BassDomain findById(final Object id) {
        if (null == id) {
            return null;
        }
        final Optional<BassDomain> res = getRepository().findById(id);
        return res.orElse(null);
    }
}
