package com.springsource.petclinic.web;

import java.util.List;

import com.springsource.petclinic.domain.Owner;
import com.springsource.petclinic.domain.Pet;
import com.springsource.petclinic.extjs.JsonObjectResponse;

import flexjson.JSONSerializer;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@RooWebScaffold(path = "pets", formBackingObject = Pet.class)
@RequestMapping("/pets")
@Controller
public class PetController {
	@RequestMapping(params = "find=ByOwnerId", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> jsonFindKeyPerformanceIndicatorsByPerformanceAreaId(@RequestParam("ownerId") Long ownerId) {
		HttpStatus returnStatus = HttpStatus.OK;
		JsonObjectResponse response = new JsonObjectResponse();

		try {
			Owner owner = Owner.findOwner(ownerId);
			if(owner != null) {
				List<Pet> records = Pet.findPetsByOwner(owner).getResultList();
	            returnStatus = HttpStatus.OK;
				response.setMessage("Pets by Owner retrieved.");
				response.setSuccess(true);
				response.setTotal(records.size());
				response.setData(records);
			} else {
				returnStatus = HttpStatus.BAD_REQUEST;
				response.setMessage("Owner ID " + ownerId + " not found.");
				response.setSuccess(false);
				response.setTotal(0L);
			}
		} catch(Exception e) {
			response.setMessage(e.getMessage());
			response.setSuccess(false);
			response.setTotal(0L);
		}
		
		// Return list of retrieved performance areas
        return new ResponseEntity<String>(new JSONSerializer().exclude("*.class", "data.owner").serialize(response), returnStatus);
    }

	
	@RequestMapping(method = RequestMethod.PUT, headers = "Accept=application/json")
    public ResponseEntity<String> updateFromJson(@RequestBody String json) {
		HttpStatus returnStatus = HttpStatus.BAD_REQUEST;
		
		JsonObjectResponse response = new JsonObjectResponse();
		try {
			Pet record = Pet.fromJsonToPet(json);
			Pet mergedRecord = (Pet)record.merge();
	        if (mergedRecord == null) {
	            returnStatus = HttpStatus.NOT_FOUND;
				response.setMessage("Pet update failed.");
				response.setSuccess(false);
				response.setTotal(0L);
	        } else {
	            returnStatus = HttpStatus.OK;
				response.setMessage("Pet updated.");
				response.setSuccess(true);
				response.setTotal(1L);
				response.setData(mergedRecord);
	        }
		} catch(Exception e) {
			response.setMessage(e.getMessage());
			response.setSuccess(false);
			response.setTotal(0L);
		}
		// return the updated record
        return new ResponseEntity<String>(new JSONSerializer().exclude("*.class","data.owner").serialize(response), returnStatus);
    }

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public ResponseEntity<String> deleteFromJson(@PathVariable("id") Long id) {
		HttpStatus returnStatus = HttpStatus.BAD_REQUEST;
		
		JsonObjectResponse response = new JsonObjectResponse();
		try {
			Pet record = Pet.findPet(id);
			record.remove();
            returnStatus = HttpStatus.OK;
			response.setMessage("Pet deleted.");
			response.setSuccess(true);
			response.setTotal(1L);
			response.setData(record);
		} catch(Exception e) {
			response.setMessage(e.getMessage());
			response.setSuccess(false);
			response.setTotal(0L);
		}
		
		// Return just the deleted id
        return new ResponseEntity<String>(new JSONSerializer().exclude("*.class","data.owner").include("data.id").exclude("data.*").serialize(response), returnStatus);
    }

	@RequestMapping(headers = "Accept=application/json")
    public ResponseEntity<String> listJson() {
		HttpStatus returnStatus = HttpStatus.OK;
		JsonObjectResponse response = new JsonObjectResponse();

		try {
			List<Pet> records = Pet.findAllPets();
            returnStatus = HttpStatus.OK;
			response.setMessage("All Pets retrieved.");
			response.setSuccess(true);
			response.setTotal(records.size());
			response.setData(records);
		} catch(Exception e) {
			response.setMessage(e.getMessage());
			response.setSuccess(false);
			response.setTotal(0L);
		}
		
		// Return list of retrieved performance areas
        return new ResponseEntity<String>(new JSONSerializer().exclude("*.class","data.owner").serialize(response), returnStatus);
	
	}

	@RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> createFromJson(@RequestBody String json) {
		HttpStatus returnStatus = HttpStatus.BAD_REQUEST;
		
		JsonObjectResponse response = new JsonObjectResponse();
		try {
			Pet record = Pet.fromJsonToPet(json);
			record.persist();
            returnStatus = HttpStatus.CREATED;
			response.setMessage("Pet created.");
			response.setSuccess(true);
			response.setTotal(1L);
			response.setData(record);
		} catch(Exception e) {
			response.setMessage(e.getMessage());
			response.setSuccess(false);
			response.setTotal(0L);
		}
		// return the created record with the new system generated id
        return new ResponseEntity<String>(new JSONSerializer().exclude("*.class","data.owner").serialize(response), returnStatus);
    }
}
