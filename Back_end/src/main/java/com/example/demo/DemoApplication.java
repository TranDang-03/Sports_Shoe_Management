package com.example.demo;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
        info = @Info(
                title = "Spring boot REST API documentation",
                description = "Spring boot REST API documentation",
                version = "1.0",
                contact = @Contact(
                        name = "Badst",
                        email = "danghansamu@gmail.com",
                        url = "https://www.javapractice.net"
                ),
                license = @License(
                        name = "Apache 3.0",
                        url = "https://www.javapractice.net/guide"
                )
        ),
        externalDocs = @ExternalDocumentation(
                description = "Spring boot API test Documentation",
                url = "https://www.javapractice.net/user-management.html"
        )
)
public class DemoApplication {

    public static void main(String[] args) {

        SpringApplication.run(DemoApplication.class, args);
    }

}
