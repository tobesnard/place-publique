package com.placepublique.backend;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Service responsable de la construction des informations de version de
 * l'application et de son environnement d'exécution.
 */
@Service
public class AppVersionService {

    private final AppConfigService appConfigService;

    /**
     * Initialise le service avec l'accès à la configuration de l'application.
     *
     * @param appConfigService service qui charge le fichier de configuration
     */
    public AppVersionService(AppConfigService appConfigService) {
        this.appConfigService = appConfigService;
    }

    /**
     * Construit les informations exposées par l'endpoint de version.
     *
     * @return le nom, la version et les informations du runtime Java
     * @throws IOException si la configuration de l'application ne peut pas être lue
     */
    public Map<String, Object> getVersion() throws IOException {
        Map<String, Object> appConfig = getAppConfig();
        Map<String, Object> version = new LinkedHashMap<>();
        version.put("name", appConfig.get("name"));
        version.put("version", appConfig.get("version"));
        version.put("runtime", getRuntimeInfo());
        return version;
    }

    /**
     * Récupère la section {@code app} de la configuration.
     *
     * @return les propriétés de l'application
     * @throws IOException si la section {@code app} est absente ou invalide
     */
    private Map<String, Object> getAppConfig() throws IOException {
        Object appConfig = appConfigService.getConfig("app").get("app");
        if (!(appConfig instanceof Map<?, ?> properties)) {
            throw new IOException("La section 'app' est absente ou invalide dans la configuration.");
        }

        Map<String, Object> appProperties = new LinkedHashMap<>();
        for (Map.Entry<?, ?> property : properties.entrySet()) {
            if (property.getKey() instanceof String key) {
                appProperties.put(key, property.getValue());
            }
        }
        return appProperties;
    }

    /**
     * Retourne les propriétés du runtime Java en conservant leur ordre d'affichage.
     *
     * @return les informations du runtime Java courant
     */
    private Map<String, Object> getRuntimeInfo() {
        Map<String, Object> runtime = new LinkedHashMap<>();
        runtime.put("name", System.getProperty("java.vm.name"));
        runtime.put("version", System.getProperty("java.vm.version"));
        runtime.put("os", getOsInfo());
        return runtime;
    }

    private Map<String, String> getOsInfo() {
        Map<String, String> osInfo = new LinkedHashMap<>();
        osInfo.put("vendor", System.getProperty("java.vendor"));
        osInfo.put("name", System.getProperty("os.name"));
        osInfo.put("version", System.getProperty("os.version"));
        osInfo.put("arch", System.getProperty("os.arch"));
        return osInfo;
    }

}