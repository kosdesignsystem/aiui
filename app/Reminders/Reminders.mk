package_name  := Reminders
dir           := $(call my_dir)

dependencies  := components/flutter

NO_LOCALIZE   := y

$(call set_env_var,PUB_HOSTED_URL,$(PUB_HOSTED_URL),TRUE)
$(if $(call is_equal,$(USE_PREBUILT_SDK),y), ,$(call set_env_var,PUB_CACHE,$(PUB_CACHE),TRUE))

include $(KB_SRCDIR)/templates/build_example.mk
