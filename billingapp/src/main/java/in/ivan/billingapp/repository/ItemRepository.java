package in.ivan.billingapp.repository;

import in.ivan.billingapp.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

    Optional<ItemEntity> findByItemId(String id);

    Integer countByCategoryId(Long Id); // if no "CategoryId" found in ItemEntity, then it maps to "category" entity: By{RelationshipName}{Field}
                                        // So here RelationshipName=Category, Field=id. It goes to Long id in CategoryEntity
}
