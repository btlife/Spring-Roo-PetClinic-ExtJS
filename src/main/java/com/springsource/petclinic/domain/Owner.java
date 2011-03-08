package com.springsource.petclinic.domain;

import org.springframework.roo.addon.entity.RooEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.tostring.RooToString;

import java.util.Collection;
import java.util.Date;
import java.util.Set;
import com.springsource.petclinic.domain.Pet;
import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

import java.util.HashSet;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooToString
@RooEntity
@RooJson
public class Owner extends AbstractPerson {

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "owner")
    private Set<Pet> pets = new HashSet<Pet>();

}
