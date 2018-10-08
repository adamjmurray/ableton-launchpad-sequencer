{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"rect" : [ 815.0, 486.0, 643.0, 441.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-33",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 14.0, 136.0, 67.0, 22.0 ],
					"presentation_rect" : [ 14.0, 136.0, 67.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "mute",
							"parameter_mmax" : 1.0,
							"parameter_shortname" : "mute",
							"parameter_type" : 1
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"style" : "",
					"text" : "pattr mute",
					"varname" : "mute"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-24",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 14.0, 96.666664, 67.0, 22.0 ],
					"presentation_rect" : [ 14.0, 96.666664, 67.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "end",
							"parameter_mmax" : 64.0,
							"parameter_mmin" : 1.0,
							"parameter_shortname" : "end",
							"parameter_type" : 1
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"style" : "",
					"text" : "pattr end",
					"varname" : "end"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-22",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 14.0, 57.333332, 67.0, 22.0 ],
					"presentation_rect" : [ 14.0, 57.333332, 67.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "start",
							"parameter_mmax" : 64.0,
							"parameter_mmin" : 1.0,
							"parameter_shortname" : "start",
							"parameter_type" : 1
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"style" : "",
					"text" : "pattr start",
					"varname" : "start"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 14.0, 18.0, 67.0, 22.0 ],
					"presentation_rect" : [ 14.0, 18.0, 67.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_invisible" : 1,
							"parameter_longname" : "steps",
							"parameter_shortname" : "steps",
							"parameter_type" : 3
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"style" : "",
					"text" : "pattr steps",
					"varname" : "steps"
				}

			}
 ],
		"lines" : [  ],
		"parameters" : 		{
			"obj-22" : [ "start", "start", 0 ],
			"obj-2" : [ "steps", "steps", 0 ],
			"obj-33" : [ "mute", "mute", 0 ],
			"obj-24" : [ "end", "end", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [  ],
		"autosave" : 0
	}

}
