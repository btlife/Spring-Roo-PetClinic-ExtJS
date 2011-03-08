Changes to PetClinic Roo Example
Spring ROO 1.1.1.RELEASE

1. clinic.roo
	1.1 add json all to end of script
	1.2 change employedSince to java.util.Date from java.util.Calendar  (was getting an error when deserializing the json into a Calendar type, didn't have time to debug)
2. created new tiles template src/main/webapp/WEB-INF/layouts/extjs.jspx
3. added new template to tiles config src/main/webapp/WEB-INF/layouts/views.xml
4. created new index_extjs.jpx that uses above template : src/main/webapp/WEB-INF/views/index_extjs.jspx
5. added new configuration for index_extjs.jspx to use new template : src/main/webapp/WEB-INF/views/views.xml
6. added static view for index_extjs.jspx : src/main/webapp/WEB-INF/spring/webmvc-config.xml
7. installed ExtJS : src/main/webapp/js/extjs-3.1.1
8. created ExtJS application : src/main/webapp/js/overrides, src/main/webapp/js/PetCompany, src/main/webapp/js/PetClinic
9. Added JsonObjectResponse.java wrapper : src/main/java/com/springsource/petclinic/extjs
10. Modified all Controllers to wrap their responses using JsonObjectResponse
 