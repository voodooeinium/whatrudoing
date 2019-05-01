<template>
    <div class="map-wrapper"></div>
</template>

<script>
import config from '@/assets/config.js'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage  from '@mapbox/mapbox-gl-language'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
    data() {
        return {
            map: null
        }
    },
    mounted() {
        var mapStyle = "light-v9";
        var hour = new Date().getHours();
        if (Number(hour) > 16) mapStyle = "dark-v9";
        this.initMap(mapStyle);
    },
    methods: {
        initMap(mapStyle) {
            mapboxgl.accessToken = config.token;
            this.map = new mapboxgl.Map({
                container: this.$el,
                style:'mapbox://styles/mapbox/' + mapStyle,
                center: [115, 36],
                maxZoom: 14,
                minZoom: 3,
                zoom: 4
            });
            
            var language = new MapboxLanguage({defaultLanguage: 'zh'});
            this.map.addControl(language);
        }
    }
}
</script>

<style scoped>
.map-wrapper{
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.title-wrapper{
    height: 100px;
    width: 400px;
    color: aliceblue;
}
.title-wrapper h2{
    color: #d6d4d4;
}
.theme-txt{
    font-size: 40px;
    font-display: 'none';
    color: #e8e94f;
}
</style>
