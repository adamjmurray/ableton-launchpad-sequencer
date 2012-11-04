{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 5,
			"minor" : 1,
			"revision" : 9
		}
,
		"rect" : [ 25.0, 69.0, 1023.0, 440.0 ],
		"bgcolor" : [ 0.909804, 0.909804, 0.909804, 1.0 ],
		"bglocked" : 0,
		"defrect" : [ 25.0, 69.0, 1023.0, 440.0 ],
		"openrect" : [ 0.0, 0.0, 0.0, 0.0 ],
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 0,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 0,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"boxes" : [ 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-16",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 103.0, 183.0, 41.0, 18.0 ],
					"text" : "set -1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 101.0, 147.0, 60.0, 20.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-4",
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 202.0, 73.0, 25.0, 25.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-26",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 554.0, 283.0, 177.0, 62.0 ],
					"presentation" : 1,
					"presentation_linecount" : 4,
					"presentation_rect" : [ 554.0, 283.0, 177.0, 62.0 ],
					"text" : "\"round-robin\" track transpose (each note transposes one track 1,2,3,4,1,2,3,etc...). \nC6 is the center."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-25",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 592.0, 208.0, 24.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 592.0, 208.0, 24.0, 20.0 ],
					"text" : "C6"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-24",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 256.0, 284.0, 77.0, 62.0 ],
					"presentation" : 1,
					"presentation_linecount" : 4,
					"presentation_rect" : [ 256.0, 284.0, 77.0, 62.0 ],
					"text" : " set scale.\nplay a chord to set the scale"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-22",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 732.0, 211.0, 24.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 732.0, 211.0, 24.0, 20.0 ],
					"text" : "C8"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-20",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 29.0, 207.0, 29.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 29.0, 207.0, 29.0, 20.0 ],
					"text" : "C-2"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-19",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 382.0, 210.0, 24.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 382.0, 210.0, 24.0, 20.0 ],
					"text" : "C3"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-17",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 336.0, 274.0, 130.0, 62.0 ],
					"presentation" : 1,
					"presentation_linecount" : 4,
					"presentation_rect" : [ 336.0, 274.0, 130.0, 62.0 ],
					"text" : "global transpose.\nC3 is \"center\", so you can transpose 1 octave up or down."
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.164706, 0.607843, 0.117647, 0.403922 ],
					"id" : "obj-14",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 669.0, 230.0, 71.0, 45.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 669.0, 230.0, 71.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.164706, 0.607843, 0.117647, 0.403922 ],
					"id" : "obj-15",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 529.0, 230.0, 71.0, 45.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 529.0, 230.0, 71.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.164706, 0.607843, 0.117647, 0.403922 ],
					"id" : "obj-12",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 389.0, 230.0, 71.0, 45.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 389.0, 230.0, 71.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.164706, 0.607843, 0.117647, 0.403922 ],
					"id" : "obj-11",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 249.0, 230.0, 71.0, 45.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 249.0, 230.0, 71.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.164706, 0.607843, 0.117647, 0.403922 ],
					"id" : "obj-10",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 109.0, 230.0, 71.0, 45.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 109.0, 230.0, 71.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-7",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 221.0, 274.0, 42.0, 48.0 ],
					"presentation" : 1,
					"presentation_linecount" : 3,
					"presentation_rect" : [ 221.0, 274.0, 42.0, 48.0 ],
					"text" : "   ^\nmute\ntrack"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-5",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 101.0, 280.0, 84.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 101.0, 280.0, 84.0, 20.0 ],
					"text" : "mute pattern"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"ignoreclick" : 1,
					"maxclass" : "kslider",
					"numinlets" : 2,
					"numoutlets" : 2,
					"offset" : 0,
					"outlettype" : [ "int", "int" ],
					"patching_rect" : [ 39.0, 230.0, 750.0, 45.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 39.0, 230.0, 750.0, 45.0 ],
					"range" : 128
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 40.0, 253.0, 190.0, 31.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 40.0, 253.0, 190.0, 31.0 ],
					"rounded" : 36
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 469.0, 255.0, 321.0, 29.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 469.0, 255.0, 321.0, 29.0 ],
					"rounded" : 36
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 250.0, 255.0, 70.0, 31.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 250.0, 255.0, 70.0, 31.0 ],
					"rounded" : 36
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-6", 0 ]
				}

			}
 ]
	}

}
