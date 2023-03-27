create:
	docker build . -t message_plugin_image
delete:
	docker rmi message_plugin_image
run:
	docker run -d -p 8080:8080 --rm --name message_plugin_container message_plugin_image
stop:
	docker stop message_plugin_container