<template>
    <div class="map-wrapper"></div>
</template>

<script>
import L from 'leaflet'
import config from '@/assets/config.js'
export default {
    props: {
        theme: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            map: null
        }
    },
    mounted() {
        this.initMap();
        this.initTitleControl();
    },
    methods: {
        initMap() {
            var osmUrl = config.mapBaseUrl + config.style + '/tiles/256/{z}/{x}/{y}?access_token=' + config.token,
                    osm = L.tileLayer(osmUrl, {
                        maxZoom: 14,
                        minZoom: 3
                    });
            this.map = new L.Map(this.$el, {
                zoomControl: false,
                attributionControl:false
            }).addLayer(osm).setView(new L.LatLng(34, 120), 5);
        },
        initTitleControl() {
            var self = this;
            var titleControl = L.control({
                position: 'topleft'
            });
            titleControl.onAdd = function() {
                this.element = L.DomUtil.create('div', 'title-wrapper');
                this.element.innerHTML = '<h2>What Are You Doing?</h2><span class="theme-txt">' + self.theme + '</span>';
                console.log(self)
                return this.element;
            };
            titleControl.addTo(this.map)
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
