package com.springsource.petclinic.domain;

import org.springframework.roo.addon.entity.RooEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.tostring.RooToString;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.validation.constraints.Min;
import com.springsource.petclinic.domain.Owner;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.springsource.petclinic.reference.PetType;
import javax.persistence.Enumerated;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooToString
@RooEntity(finders = { "findPetsByNameAndWeight", "findPetsByOwner", "findPetsBySendRemindersAndWeightLessThan", "findPetsByTypeAndNameLike" })
@RooJson
public class Pet {

    @NotNull
    private boolean sendReminders;

    @NotNull
    @Size(min = 1)
    private String name;

    @NotNull
    @Min(0L)
    private Float weight;

    @ManyToOne
    private Owner owner;
    
    @Transient
    public String getOwnerName() {
    	return this.owner.getFirstName() + ' ' + this.owner.getLastName();
    }
    
    @Transient
    public void setOwnerName(String fullName) {
    	//do nothing, set logic is performed in setOwnerId
    }
    
    @Transient
    public Long getOwnerId() {
    	return this.owner.getId();
    }
    
    @Transient
    public void setOwnerId(Long id) {
    	this.owner = Owner.findOwner(id);
    }

    @NotNull
    @Enumerated
    private PetType type;
}
