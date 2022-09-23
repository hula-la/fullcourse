package com.ssafy.fullcourse.global.Specification;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCTag;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Expression;

public class SharedFCTagSpecification {

    public static Specification<SharedFCTag> tagContains(String tags) {
        return (root, query, builder) -> {
            Expression<String> tagLowerCase = builder.lower(root.get("tagContent"));
            return builder.like(tagLowerCase, tags.toLowerCase());
        };
    }
}
