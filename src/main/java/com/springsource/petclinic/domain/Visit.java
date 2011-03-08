package com.springsource.petclinic.domain;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

import java.util.Collection;
import java.util.Date;

import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.roo.addon.entity.RooEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooEntity(finders = { "findVisitsByDescriptionAndVisitDate", "findVisitsByVisitDateBetween", "findVisitsByDescriptionLike" })
@RooJson
public class Visit {

    @Size(max = 255)
    private String description;

    @NotNull
    @Past
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "S-")
    private Date visitDate;

    @NotNull
    @ManyToOne
    private Pet pet;

    @Transient 
    public String getPetName() {
    	return this.pet.getName();
    }
    
    @Transient 
    public void setPetName(String name) {
    	// do nothing set is handled in setPetName()
    	// this is here for Json DeSerialization
    }
    
    @Transient 
    public Long getPetId() {
    	return this.pet.getId();
    }
    
    @Transient
    public void setPetId(Long id) {
    	this.pet = Pet.findPet(id);
    }
    
    @ManyToOne
    private Vet vet;

    @Transient 
    public String getVetName() {
    	return this.vet.getFirstName() + ' ' + this.vet.getLastName();
    }
    
    @Transient 
    public void setVetName(String name) {
    	// do nothing set is handled in setPetName()
    	// this is here for Json DeSerialization
    }
    
    @Transient 
    public Long getVetId() {
    	return this.vet.getId();
    }
    
    @Transient
    public void setVetId(Long id) {
    	this.vet = Vet.findVet(id);
    }

}
